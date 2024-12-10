The official PostgreSQL Docker image (postgres:17-alpine) automatically creates a database if the environment variables POSTGRES_DB, POSTGRES_USER, and POSTGRES_PASSWORD are provided. These environment variables are used to set up an initial database and user upon container startup.

Storageclas  was set to "" because default is backed by dynamic provisioner which cannot create a pv unless a consuming pod is created and the pod goes to pending because ther is no PV.

The workaround was to create PV manually and then create the statefulset.