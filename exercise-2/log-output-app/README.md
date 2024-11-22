volume mounts like empty Dir overwrite the contents of working directory when mounted.

seperate docker file for each containers mount the shared volume for both containers.

It has same lifetime as of pod once pod is down all data is lost

Persistant volumes is cluster wide resource. Its is backed by variuos types of storage like local disk,NFS,cloud storage.

Lifecycle is independent of pods. 

The data will persist in the kind node container at /mnt/data 

/mnt/data is the path on the host machine where your data is stored.

/app/shared is the path inside the pod where the host directory (/mnt/data) is mounted.

Always interact with the volume through the /app/shared path inside the container, not /mnt/data (which is only accessible from the host).

hostPath mounts a volume on the node and application running on that node can only access that path.

If you want to share files across nodes then we need to use nfs

Well setting up nfs requires a nfs server which I dont have now and then run a dynamic provisioner on it to get a pv. 

This cronJob idea was not suitable at this stage but it was great learning.

