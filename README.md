# A Quick Dive into ArgoCD Sync Phases & Waves

## Repo Contents

This repo accompanies a lightning talk that I gave at KubeCon NA 2024. It contains a bunch of code and configs that help demo how ArgoCD's sync phases and waves work.

The application code lives in the following folders:
- `secret-provisioning-job/` contains the K8s Job that updates the MySQL password and stores it as a Secret
- `demo-api-service/` contains the application specified in the Deployment that will use the updated MySQL password
- `api-test-job/` contains the Job that will run tests against the API in the `demo-api-service`
- `secret-cleanup-job/` removes previous Secrets created for the MySQL password

The Helm chart for the various resources lives in the `chart/` folder. The YAML that specifies all of their sync phases and waves lives in `chart/templates/deployment.yaml`.

Finally, the manifests that set up support resources, e.g. the K8s admin service account and the ArgoCD application, live in the `manifests/` folder.

## Running the Demo

### Setup

First, install ArgoCD in your cluster:
```sh
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

Next, install MySQL:
```sh
helm install mysqldb oci://registry-1.docker.io/bitnamicharts/mysql
```

**SUPER IMPORTANT to note**: the `secret-provisioning-job` pulls the MySQL root seceret based on the name provided by the Helm release. If you change the name of the Helm release, you'll also have to change the name of the secret that the `secret-provisioning-job` pulls its secret from in `chart/templates/deployment.yaml`.

Finally, create the service account that the different jobs will use to access the K8s API:
```sh
kubectl apply -f manifests/admin-sa.yaml
```

### Running

Port-forward the ArgoCD service so that you can access the UI in your browser:
```sh
kubectl port-forward -n argocd svc/argocd-server 8080:443
```

And then get the initial admin secret for the ArgoCD admin user:
```sh
kubectl get secret -n argocd argocd-initial-admin-secret -o jsonpath='{.data..password}' | base64 -d
```

Now you can sign in to the ArgoCD UI using the username `admin` and the password printed in the console from the command you just ran by opening your browser to [http://localhost:8080](http://localhost:8080).

The cluster in which you've installed ArgoCD will already be configured, and this repo is public, so you shouldn't have to configure anything to get this demo running in your cluster.

Simply apply the `manifests/argocd-application.yaml` and you can watch the full deployment from start to finish:
```sh
kubectl apply -n argocd -f manifests/argocd-application.yaml
```


## Note:

This was a demo used for a lightning talk, so it just gives a quick view into the functionality of the sync phases and waves. It doesn't go into production-level concerns like rollbacks and error cases. 

If that's something you're interested in, catch me on [LinkedIn](https://www.linkedin.com/in/colinjlacy/) and we can dive into that together.