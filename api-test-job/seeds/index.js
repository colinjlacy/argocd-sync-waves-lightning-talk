export function getSeedData() {
    return [
        {
            "address": "module.root.github.repo.test",
            "type": "repo",
            "name": "test",
            "module": "root",
            "allowDelete": false
        },
        {
            "address": "module.root.github.branch.test-branch",
            "type": "branch",
            "name": "test-branch",
            "module": "root",
            "allowDelete": false
        },
        {
            "address": "module.root.github.branch_protection.test",
            "type": "branch_protection",
            "name": "test",
            "module": "root",
            "allowDelete": false
        },
    ]
}