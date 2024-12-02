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
helm install myk8sapp-dev-v1.0 myk8sapp/ --values values.yaml -f values-dev.yaml -n dev
helm install myk8sapp-prod-v1.0 myk8sapp/ --values values.yaml -f values-dev.yaml -n prod