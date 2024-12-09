# This is a sample README file containing all important commands used during this demo:
## IMPORTANT GIT COMMANDS

### Pull the current status of GIT in respective branch:
```bash
git Pull
```

### Switch to respective develop (e.g.) branch:
```bash
git switch develop
```

### Check which git branches are available:
```bash
git branch
```
### Create a new branch (e.g. feature) and navigate to it:
```bash
git checkout -b feature
```
### Add a new file in the branch:
```bash
git add .
```
### Commit the added file:
```bash
git commit -m "this is a sample commit"
```
### Push the local feature branch to remote:
```bash
git push -u origin feature
```
### Then checkout the master branch:
```bash
git checkout master
```
### Then merge the updates to master branch:
```bash
git merge feature
```
### Then push local master branch to remote:
```bash
git push -u origin master
```

## IMPORTANT HELM COMMANDS

### Create helm chart:
```bash
helm create myk8sapp
```

### Helm install command to install myk8sapp-v1.0 in directory myk8sapp/ and in k8s namespace test
```bash
helm install myk8sapp-v1.0 myk8sapp/ -n test
```

### Helm upgrade command to upgrade the installed helm application:
```bash
helm upgrade myk8sapp-v1.0 myk8sapp/ -n test
```

### Helm template command to check if templating is right without changing in practical:
```bash
helm template ./myk8sapp --debug
```

### Helm install command with to use one base value file and to override some values from a env specific value file
```bash
helm install myk8sapp-dev-v1.0 myk8sapp/ --values myk8sapp/values.yaml -f myk8sapp/values-dev.yaml -n dev
helm install myk8sapp-prod-v1.0 myk8sapp/ --values myk8sapp/values.yaml -f myk8sapp/values-dev.yaml -n prod
```

### Helm upgrade command with to use one base value file and to override some values from a env specific value file
```bash
helm upgrade myk8sapp-dev-v1.0 myk8sapp/ --values myk8sapp/values.yaml -f myk8sapp/values-dev.yaml -n dev
helm upgrade myk8sapp-prod-v1.0 myk8sapp/ --values myk8sapp/values.yaml -f myk8sapp/values-dev.yaml -n prod
```

### Post deployment steps:

After the Helm chart deployment of the application, we have made the deployed application accessible from outside of Cluster using NGINX
Ingress Controller. The below steps are followed:

1. Following the instructions as mentioned in [official documentation] (https://kubernetes.github.io/ingress-nginx/deploy/#docker-desktop) the nginx-ingress Controller is installed using kubectl manifest files.

2. The corresponding _spec.ingressClassName: "nginx"_ must be mentioned in respective ingress configuration.

3. The hostname mentioned in section spec.rules.host of ingress configuration, must be whitelisted in _C:\Windows\System32\drivers\etc\hosts_ to bind it to localhost as follows:

### Example snippet from ...\etc\hosts file:
### To allow the same kube context to work on the host and the container:
```bash 
127.0.0.1 kubernetes.docker.internal
127.0.0.1 myk8sapp-dev.ingress.com
127.0.0.1 myk8sapp-prod.ingress.com
```

4. Afterwards the deployed app (staged) can be accessed invoking requisite URLs, as follows:

DEV: [myk8sapp-dev] (http://myk8sapp-dev.ingress.com)
PROD:[myk8sapp-prod] (http://myk8sapp-prod.ingress.com) 

Please note, the ingress is still not secured by any TLS secret. 