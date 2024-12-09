This is a sample README file containing all important commands used during this demo:
++++++++++++++++++++++++++++++++++++++++++++++++++++++IMPORTANT GIT COMMANDS+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

# Pull the current status of GIT in respective branch:
git Pull

# Switch to respective develop (e.g.) branch:
git switch develop

# Check which git branches are available:
git branch

# Create a new branch (e.g. feature) and navigate to it:
git checkout -b feature

# Add a new file in the branch:
git add .

# Commit the added file:
git commit -m "this is a sample commit"

# Push the local feature branch to remote:
git push -u origin feature

# Then checkout the master branch:
git checkout master

# Then merge the updates to master branch:
git merge feature

# Then push local master branch to remote:
git push -u origin master


++++++++++++++++++++++++++++++++++++++++++++++++++++++IMPORTANT HELM COMMANDS++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

# Create helm chart:
helm create myk8sapp

# Helm install command to install myk8sapp-v1.0 in directory myk8sapp/ and in k8s namespace test
helm install myk8sapp-v1.0 myk8sapp/ -n test

# Helm upgrade command to upgrade the installed helm application:
helm upgrade myk8sapp-v1.0 myk8sapp/ -n test

#Helm template command to check if templating is right without changing in practical:
helm template ./myk8sapp --debug

#Helm install command with to use one base value file and to override some values from a env specific value file
helm install myk8sapp-dev-v1.0 myk8sapp/ --values myk8sapp/values.yaml -f myk8sapp/values-dev.yaml -n dev
helm install myk8sapp-prod-v1.0 myk8sapp/ --values myk8sapp/values.yaml -f myk8sapp/values-dev.yaml -n prod

#Helm upgrade command with to use one base value file and to override some values from a env specific value file
helm upgrade myk8sapp-dev-v1.0 myk8sapp/ --values myk8sapp/values.yaml -f myk8sapp/values-dev.yaml -n dev
helm upgrade myk8sapp-prod-v1.0 myk8sapp/ --values myk8sapp/values.yaml -f myk8sapp/values-dev.yaml -n prod


+++++++++++++++++++++++++++++++++++++++++++++++++++++++NEXT STEPS+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
# Post deployment steps:

After the Helm chart deployment of the application, we have made the deployed application accessible from outside of Cluster using NGINX
Ingress Controller. The below steps are followed:

1. Following the instructions as mentioned in https://kubernetes.github.io/ingress-nginx/deploy/#docker-desktop the nginx-ingress Controller is installed using kubectl manifest files.

2. The corresponding spec.ingressClassName: "nginx" must be mentioned in respective ingress configuration.

3. The hostname mentioned in section spec.rules.host of ingress configuration, must be whitelisted in C:\Windows\System32\drivers\etc\hosts to bind it to localhost as follows:

# Example snippet from ...\etc\hosts file:
## To allow the same kube context to work on the host and the container:
127.0.0.1 kubernetes.docker.internal
127.0.0.1 myk8sapp-dev.ingress.com
127.0.0.1 myk8sapp-prod.ingress.com

4. Afterwards the deployed app (staged) can be accessed invoking requisite URLs, as follows:

DEV: http://myk8sapp-dev.ingress.com
PROD: http://myk8sapp-prod.ingress.com 

Please note, the ingress is still not secured by any TLS secret. 