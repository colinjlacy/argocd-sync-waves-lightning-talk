export async function runTests(proto, domain, resources) {
    const tests = [
        fetchResourcesTest,
        replaceResourcesTest,
        patchResourcesTest
    ];

    let results = [];
    for (let i = 0; i < tests.length; i++) {
        results.push(await tests[i](proto, domain, resources));
    }
    return results;
}

async function fetchResourcesTest(proto, domain, resources) {
    const res = await fetch(`${proto}://${domain}/resources`);
    const data = await res.json();
    return data.length === resources.length;
}

async function replaceResourcesTest(proto, domain, resources) {
    const newResources = resources.map(((x, i) => {
        x.name = `new-${x.name}-${i}`;
        return x;
    }));
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({resources: newResources})
    };

    const res = await fetch(`${proto}://${domain}/resources`, options);
    const data = await res.json();
    if (!!data.ok) return false;

    const newRes = await fetch(`${proto}://${domain}/resources`);
    const newData = await newRes.json();
    let match = true;
    newData.forEach((x, i) => {
        if (x.name !== newResources[i].name) {
            match = false;
        }
    });
    return match;
}

async function patchResourcesTest(proto, domain) {
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({allowDelete: true})
    };

    const res = await fetch(`${proto}://${domain}/resources/1/allowDelete`, options);
    const data = await res.json();
    if (!!data.ok) return false;

    const newRes = await fetch(`${proto}://${domain}/resources`);
    const newData = await newRes.json();
    const resource = newData.find(x => x.id === 1);
    return resource.allowDelete;
}