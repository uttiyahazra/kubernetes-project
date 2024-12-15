#
#### Important Git and Helm commands checklist during application deployment

##### Pull the current status of GIT in respective branch:
```bash
git Pull
```

##### Switch to respective develop (e.g.) branch:
```bash
git switch develop
```

##### Check which git branches are available:
```bash
git branch
```
##### Create a new branch (e.g. feature) and navigate to it:
```bash
git checkout -b feature
```
##### Add a new file in the branch:
```bash
git add .
```
##### Commit the added file:
```bash
git commit -m "this is a sample commit"
```
##### Push the local feature branch to remote:
```bash
git push -u origin feature
```
##### Then checkout the master branch:
```bash
git checkout master
```
##### Then merge the updates to master branch:
```bash
git merge feature
```
##### Then push local master branch to remote:
```bash
git push -u origin master
```

##### Create helm chart:
```bash
helm create myk8sapp
```

##### Helm install command to install myk8sapp-v1.0 in directory myk8sapp/ and in k8s namespace test
```bash
helm install myk8sapp-v1.0 myk8sapp/ -n test
```

##### Helm upgrade command to upgrade the installed helm application:
```bash
helm upgrade myk8sapp-v1.0 myk8sapp/ -n test
```

##### Helm template command to check if templating is right without changing in practical:
```bash
helm template ./myk8sapp --debug
```

##### Helm install command with to use one base value file and to override some values from a env specific value file
```bash
helm install myk8sapp-dev-v1.0 myk8sapp/ --values myk8sapp/values.yaml -f myk8sapp/values-dev.yaml -n dev
helm install myk8sapp-prod-v1.0 myk8sapp/ --values myk8sapp/values.yaml -f myk8sapp/values-dev.yaml -n prod
```

##### Helm upgrade command with to use one base value file and to override some values from a env specific value file
```bash
helm upgrade myk8sapp-dev-v1.0 myk8sapp/ --values myk8sapp/values.yaml -f myk8sapp/values-dev.yaml -n dev
helm upgrade myk8sapp-prod-v1.0 myk8sapp/ --values myk8sapp/values.yaml -f myk8sapp/values-dev.yaml -n prod
```

#### Accessing deployed application through NGINX Ingress

After the Helm chart deployment of the application, we have made the deployed application accessible from outside of Cluster using NGINX
Ingress Controller. The below steps are followed:

1. Following the instructions as mentioned in official documentation https://kubernetes.github.io/ingress-nginx/deploy/#docker-desktop the nginx-ingress Controller is installed using kubectl manifest files.

2. The corresponding _spec.ingressClassName: "nginx"_ must be mentioned in respective ingress configuration.

3. The hostname mentioned in section spec.rules.host of ingress configuration, must be whitelisted in _C:\Windows\System32\drivers\etc\hosts_ to bind it to localhost as follows:

###### Example snippet from ...\etc\hosts file:
###### To allow the same kube context to work on the host and the container:
```bash 
127.0.0.1 kubernetes.docker.internal
127.0.0.1 myk8sapp-dev.ingress.com
127.0.0.1 myk8sapp-prod.ingress.com
```

4. Afterwards the deployed app (staged) can be accessed invoking requisite URLs, as follows:

DEV: http://myk8sapp-dev.ingress.com
PROD: http://myk8sapp-prod.ingress.com

Please note, the ingress is still not secured by any TLS secret. 

5. Since this is a Prometheus example exposing some basic Prometheus scrapable metrics by default, by invoking the DEV http://myk8sapp-dev.ingress.com/metrics or PROD http://myk8sapp-prod.ingress.com/metrics endpoints, the following metrics will be visible

```bash
# HELP http_request_duration_seconds Duration of all HTTP requests
# TYPE http_request_duration_seconds histogram
http_request_duration_seconds_bucket{code="200",handler="found",method="get",le="0.005"} 29
http_request_duration_seconds_bucket{code="200",handler="found",method="get",le="0.01"} 29
http_request_duration_seconds_bucket{code="200",handler="found",method="get",le="0.025"} 29
http_request_duration_seconds_bucket{code="200",handler="found",method="get",le="0.05"} 29
http_request_duration_seconds_bucket{code="200",handler="found",method="get",le="0.1"} 29
http_request_duration_seconds_bucket{code="200",handler="found",method="get",le="0.25"} 29
http_request_duration_seconds_bucket{code="200",handler="found",method="get",le="0.5"} 29
http_request_duration_seconds_bucket{code="200",handler="found",method="get",le="1"} 29
http_request_duration_seconds_bucket{code="200",handler="found",method="get",le="2.5"} 29
http_request_duration_seconds_bucket{code="200",handler="found",method="get",le="5"} 29
http_request_duration_seconds_bucket{code="200",handler="found",method="get",le="10"} 29
http_request_duration_seconds_bucket{code="200",handler="found",method="get",le="+Inf"} 29
http_request_duration_seconds_sum{code="200",handler="found",method="get"} 0.0025533689999999993
http_request_duration_seconds_count{code="200",handler="found",method="get"} 29
# HELP http_requests_total Count of all HTTP requests
# TYPE http_requests_total counter
http_requests_total{code="200",method="get"} 29
# HELP version Version information about this binary
# TYPE version gauge
version{version="v0.3.0"} 1
```
#### Accessing the Prometheus and Grafana endpoints & visualization

1. Following the instructions mentioned in official GitHub documentation of kube-promethus-stack https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-prometheus-stack the kube-prometheus-stack was installed.

2. To make the Prometheus & Grafana endpoints accessible over deployed NGINX ingress, the respective ingress configurations (part of Helm chart) were added and similar to above mentoned way the access-URLS of http://prometheus.ingress.com/ and http://prometheus-grafana.ingress.com/ were whitelisted in .../etc/hosts configuration. Afterwards the Prometheus and Grafana were accessible accordingly.

#### Deployment of Prometheus Exporter for MongoDB to make MongoDB metrics fetched in Prometheus endpoint

Since MongoDB doesn't automatically expose its metrics to Prometheus endpoint, a deployment of Prometheus-exporter for MongoDB is thus necessary to pull its metrics and make these scrapable by Prometheus endpoint.

1. Following the instructions mentioned in official GitHub documentation of prometheus-exporter of mongodb https://github.com/prometheus-community/helm-charts/tree/main/charts/prometheus-modbus-exporter the MongoDB Prometheus was installed. Due to the different MongoDB Service name and label used to make the prometheus-exporter  ServiceMonitor discoverable by deployed kube-prometheus stack, during the installation using a custom value file the following values were overridden:

```yaml 
mongodb:
  uri: "mongodb://myk8sappdb-service:27017"

serviceMonitor:
  enabled: true
  additionalLabels:
    release: prometheus
```

2. To make the MongoDB Prometheus endpoints accessible over deployed NGINX ingress, the respective ingress configuration (part of Helm chart) was added and similar to above mentoned way the access-URLS of http://prometheus-myk8sappdb-exporter.ingress.com was whitelisted in .../etc/hosts configuration. Afterwards the MongoDB ServiceMontor was accessible by calling the http://prometheus.ingress.com/targets endpoint.