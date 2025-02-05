#### A Sample Kubernetes Project With Useful Illustrations
- ##### Environment specification

###### Operating System
```bash
Windows 11
```
###### Docker Desktop & Docker Engine Version
```bash 
$ docker version
Client:
 Version:           27.4.0
 API version:       1.47
 Go version:        go1.22.10
 Git commit:        bde2b89
 OS/Arch:           windows/amd64
 Context:           desktop-linux

Server: Docker Desktop 4.37.1 (178610)
 Engine:
  Version:          27.4.0
  API version:      1.47 (minimum version 1.24)
  Go version:       go1.22.10
  Git commit:       92a8393
  OS/Arch:          linux/amd64
  Experimental:     false
 containerd:
  Version:          1.7.21
  GitCommit:        472731909fa34bd7bc9c087e4c27943f9835f111
 runc:
  Version:          1.1.13
  GitCommit:        v1.1.13-0-g58aa920
 docker-init:
  Version:          0.19.0
  GitCommit:        de40ad0
```
###### Kubernetes Vesrion
```bash
$ kubectl version
Client Version: v1.30.5
Kustomize Version: v5.0.4-0.20230601165947-6ce0bf390ce3
Server Version: v1.30.5
```
###### Helm Version
```bash
$ helm version
version.BuildInfo{Version:"v3.12.2", GitCommit:"1e210a2c8cc5117d1055bfaa5d40f51bbc2e345e", GitTreeState:"clean", GoVersion:"go1.20.5"}
```
###### WSL Version
```bash
$ wsl --version
WSL version: 2.3.26.0
Kernel version: 5.15.167.4-1
WSLg version: 1.0.65
MSRDC version: 1.2.5620
Direct3D version: 1.611.1-81528511
DXCore version: 10.0.26100.1-240331-1435.ge-release
Windows version: 10.0.22631.4602
```
- ##### [Deployment of a staged application with Helm](https://github.com/uttiyahazra/kubernetes-project/blob/master/myk8sapp/ReadTheDocs.md) 
- ##### [Deployment of NGINX Ingress Controller and Accessing applications through Ingress](https://github.com/uttiyahazra/kubernetes-project/blob/master/myk8sapp/ReadTheDocs.md#deployment-of-nginx-ingress-controller-and-accessing-applications-through-ingress)
- ##### [Deployment and Access the Kubernetes Dashboard](https://github.com/uttiyahazra/kubernetes-project/blob/master/myk8sapp/ReadTheDocs.md#deployment-and-accessing-kubernetes-dashboard)
- ##### [Installation of Cert-Manager and Generation of Self signed certificate for TLS termination](https://github.com/uttiyahazra/kubernetes-project/blob/master/myk8sapp/ReadTheDocs.md#installation-of-cert-manager-and-generation-of-self-signed-certificate-for-tls-termination)
- ##### [Deployment of Kube-Prometheus Stack and Accessing Prometheus Metrics & Grafana Visualizations](https://github.com/uttiyahazra/kubernetes-project/blob/master/myk8sapp/ReadTheDocs.md#deployment-of-kube-prometheus-stack-and-accessing-prometheus-metrics--grafana-visualizations)
- ##### [Deployment of Prometheus-Exporter for a MongoDB Application and Accessing MongoDB Prometheus Metrics](https://github.com/uttiyahazra/kubernetes-project/blob/master/myk8sapp/ReadTheDocs.md#deployment-of-prometheus-exporter-for-a-mongodb-application-to-make-mongodb-metrics-fetched-in-prometheus-endpoint)
- ##### [Deployment of ArgoCD and Leveraging Continuous Deployment with it](https://github.com/uttiyahazra/kubernetes-project/blob/master/myk8sapp/ReadTheDocs.md#deployment-of-argocd-and-leveraging-continuos-deployment-with-it)
- ##### [Illustration of Stakater Reloader](https://github.com/uttiyahazra/kubernetes-project/blob/master/myk8sapp/ReadTheDocs.md#illustration-of-stakater-reloader)
- ##### [Installation of EFK Stack for K8s logging](https://github.com/uttiyahazra/kubernetes-project/blob/master/myk8sapp/ReadTheDocs.md#installation-of-efk-stack-for-k8s-logging)
- ##### [Illustration of following Kubernetes Pod & Container specific tasks:](https://github.com/uttiyahazra/kubernetes-project/blob/master/myk8sapp/ReadTheDocs.md#illustration-of-following-kubernetes-pod--container-specific-tasks)
  1. ###### [In Place Container's CPU & Memory Resource Adjustment](https://github.com/uttiyahazra/kubernetes-project/blob/master/myk8sapp/ReadTheDocs.md#exemplification-of-in-place-containers-cpu--memory-resource-adjustment)
  2. ###### [Different Pod QoS in action](https://github.com/uttiyahazra/kubernetes-project/blob/master/myk8sapp/ReadTheDocs.md#exemplification-of-different-pod-qos)
  3. ##### [Illustration of Native SideCar](https://github.com/uttiyahazra/kubernetes-project/blob/master/myk8sapp/ReadTheDocs.md#illustration-of-native-sidecar-container)
_to be continued_
