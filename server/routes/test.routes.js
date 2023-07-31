import { Router } from 'express';

const router = Router();

router.get("/test", (request, response) => {
    response.send("Hello world by GET method");
});

router.post("/test", (request, response) => {
    response.send("Hello world by POST method");
});

router.put("/test", (request, response) => {
    response.send("Hello world by PUT method");
});

router.delete("/test", (request, response) => {
    response.send("Hello world by DELETE method");
});

export default router;