import { Router } from 'express';
import { testGet, testPost } from '../controllers/testController.js';

const router = Router();

router.get("/test", testGet);

router.post("/test", testPost );

router.put("/test", (request, response) => {
    response.send("Hello world by PUT method");
});

router.delete("/test", (request, response) => {
    response.send("Hello world by DELETE method");
});

export default router;