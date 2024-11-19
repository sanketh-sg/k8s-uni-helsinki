volume mounts like empty Dir overwrite the contents of working directory when mounted.

seperate docker file for each containers mount the shared volume for both containers.

It has same lifetime as of pod once pod is down all data is lost

Persistant volumes is cluster wide resource. Its is backed by variuos types of storage like local disk,NFS,cloud storage.

Lifecycle is independent of pods. 

The data will persist in the kind node container at /mnt/data 