# Phobos Server

A server that provides images of phobia. Runs on port 4000.

## Schema

```graphql
type Image {
    id: !Int
    title: !String
    url: !String
    scariness: !Int
    phobium_id: String
}
type Phobium {
    id: !String
    images: [Image]
}
```

## Queries

```graphql
Image(id: 1) {
    id
    title
    url
    scariness
}
Phobium(id: "thalassophobia") {
    id
    Images {
        id
        title
        url
        scariness
    }
}
allImages {
    id
}
allPhobia {
    id
}
```
