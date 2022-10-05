# Docker commands

## Build the image

To build your latest Docker image run the following command :

```
docker build -t ianlcz/homemovie:latest .
```

## Launch container with this image

Run **homemovie** container by using Docker thanks to this command on Linux:

```
docker run --rm -d --name homemovie -v $(pwd)/src:/home/homemovie/src -p 3000:3000 ianlcz/homemovie
```

or on Windows :

```
docker run --rm -d --name homemovie -v %cd%/src:/home/homemovie/src -p 3000:3000 ianlcz/homemovie
```
