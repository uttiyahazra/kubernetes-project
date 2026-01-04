# A Sample Kubernetes Project With Useful Illustrations

This repository demonstrates deploying and managing applications on Kubernetes using Helm, Ingress, Cert‑Manager, Prometheus, ArgoCD, and more. It also includes practical illustrations of pod/container behaviors and logging/monitoring stacks.

---

## 🚀 Environment Specification

### Operating System
```bash
Windows 11
```
### Docker Desktop & Engine
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
### Kubernetes Vesrion
```bash
$ kubectl version
Client Version: v1.30.5
Kustomize Version: v5.0.4-0.20230601165947-6ce0bf390ce3
Server Version: v1.30.5
```
### Helm Version
```bash
$ helm version
version.BuildInfo{Version:"v3.12.2", GitCommit:"1e210a2c8cc5117d1055bfaa5d40f51bbc2e345e", GitTreeState:"clean", GoVersion:"go1.20.5"}
```
### WSL Version
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

## 📦 Project Documentation
Detailed walkthroughs and illustrations are available in ReadTheDocs.md.

### Core Deployments

- ##### [Staged App with Helm](https://github.com/uttiyahazra/kubernetes-project/blob/master/myk8sapp/docs/ReadTheDocs.md#deployment-of-a-staged-application-with-helm) 
- ##### [NGINX Ingress Controller](https://github.com/uttiyahazra/kubernetes-project/blob/master/myk8sapp/docs/ReadTheDocs.md#deployment-of-nginx-ingress-controller-and-accessing-applications-through-ingress)
- ##### [Kubernetes Dashboard](https://github.com/uttiyahazra/kubernetes-project/blob/master/myk8sapp/docs/ReadTheDocs.md#deployment-and-accessing-kubernetes-dashboard)
- ##### [Cert-Manager & TLS Termination](https://github.com/uttiyahazra/kubernetes-project/blob/master/myk8sapp/docs/ReadTheDocs.md#installation-of-cert-manager-and-generation-of-self-signed-certificate-for-tls-termination)

### Monitoring & Logging

- ##### [Kube-Prometheus Stack](https://github.com/uttiyahazra/kubernetes-project/blob/master/myk8sapp/docs/ReadTheDocs.md#deployment-of-kube-prometheus-stack-and-accessing-prometheus-metrics--grafana-visualizations)
- ##### [MongoDB Prometheus Exporter](https://github.com/uttiyahazra/kubernetes-project/blob/master/myk8sapp/docs/ReadTheDocs.md#deployment-of-prometheus-exporter-for-a-mongodb-application-to-make-mongodb-metrics-fetched-in-prometheus-endpoint)
- ##### [EFK Stack](https://github.com/uttiyahazra/kubernetes-project/blob/master/myk8sapp/docs/ReadTheDocs.md#installation-of-efk-stack-for-k8s-logging)

### Continuous Deployment

- ##### [ArgoCD](https://github.com/uttiyahazra/kubernetes-project/blob/master/myk8sapp/docs/ReadTheDocs.md#deployment-of-argocd-and-leveraging-continuos-deployment-with-it)
- ##### [Stakater Reloader](https://github.com/uttiyahazra/kubernetes-project/blob/master/myk8sapp/docs/ReadTheDocs.md#illustration-of-stakater-reloader)

### Pod & Container Illustrations

- ##### [In Place Container's CPU & Memory Resource Adjustment](https://github.com/uttiyahazra/kubernetes-project/blob/master/myk8sapp/docs/ReadTheDocs.md#exemplification-of-in-place-containers-cpu--memory-resource-adjustment)
- ##### [Different Pod QoS in action](https://github.com/uttiyahazra/kubernetes-project/blob/master/myk8sapp/docs/ReadTheDocs.md#exemplification-of-different-pod-qos)
- ##### [Illustration of Native SideCar](https://github.com/uttiyahazra/kubernetes-project/blob/master/myk8sapp/docs/ReadTheDocs.md#illustration-of-native-sidecar-container)

### 🗂️ Repository Structure

```ascii
kubernetes-project		
├── .git
├── README.md
├── googleeadd32ffd796da1a.html
├── helperScripts
│   └── tree.py
└── myk8sapp
    ├── .helmignore
    ├── Chart.yaml
    ├── docs
    │   ├── CertManager.png
    │   ├── ElasticSearch.png
    │   ├── Kibana UI.png
    │   └── ReadTheDocs.md
    ├── templates
    │   ├── _helpers.tpl
    │   ├── certs
    │   │   ├── clusterissuer.yaml
    │   │   ├── myk8sapp-cert.yaml
    │   │   ├── prometheus-cert.yaml
    │   │   └── prometheus-grafana-cert.yaml
    │   ├── config
    │   │   ├── mongodb-secrets.yaml
    │   │   └── myk8sapp-configmap.yaml
    │   ├── deployments
    │   │   ├── es-cluster-statefulset.yaml
    │   │   ├── fluentd-daemonset.yaml
    │   │   ├── kibana-deployment.yaml
    │   │   ├── myk8sapp-deployment.yaml
    │   │   ├── myk8sapp-mongodb-client-deployment.yaml
    │   │   ├── myk8sapp-mongodb-statefulset.yaml
    │   │   └── test-pod-kibana.yaml
    │   ├── ingress
    │   │   ├── argocd-server-ingress.yaml
    │   │   ├── es-ingress.yaml
    │   │   ├── kibana-ingress.yaml
    │   │   ├── kube-dashboard-ingress.yaml
    │   │   ├── myk8sapp-ingress.yaml
    │   │   ├── prometheus-exporter-ingress.yaml
    │   │   ├── prometheus-grafana-ingress.yaml
    │   │   └── prometheus-ingress.yaml
    │   ├── rbac
    │   │   ├── fluentd-clusterrole.yaml
    │   │   ├── fluentd-crb.yaml
    │   │   ├── fluentd-sa.yaml
    │   │   └── myk8sapp-serviceaccount.yaml
    │   ├── services
    │   │   ├── es-service.yaml
    │   │   ├── kibana-service.yaml
    │   │   ├── myk8sapp-mongodb-service.yaml
    │   │   └── myk8sapp-service.yaml
    │   └── storage
    │       ├── myk8sapp-mongodb-pv.yaml
    │       └── myk8sapp-mongodb-pvc.yaml
    ├── values-dev.yaml
    ├── values-mongodb-exporter.yaml
    ├── values-prod.yaml
    └── values.yaml
```