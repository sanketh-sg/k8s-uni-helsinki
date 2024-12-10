It's not your frontend pod that is making a call to the backend pod, but the browser. 

It was not working because 
1) the browser is trying to resolve a DNS name (restservice) that can only be resolved by the DNS server running inside the cluster, and, 
2) even if the browser could resolve the DNS name, pods are not exposed to the outside world.

You have to create an ingress, that points to your backend service (that points to the backend pod), and use the URL that you have configured in the ingress, as the endpoint to connect to, in your frontend application.

The Ingress resource only works with services within its own namespace. If you want to route traffic to services in different namespaces, the services must be exposed via additional mechanisms or reside within the same namespace.