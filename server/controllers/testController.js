export const testGet = (request, response) => {
    response.send("Hello world by GET method through controller")
}

export const testPost = (request, response) => {
    console.log({ body: request.body })

    response.send({
        message: "Hello world by POST method through controller",
        body: request.body
    });
};