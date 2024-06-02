class Feedback {
    constructor(id, text, lido) {
        this.id = id;
        this.text = text;
        this.read = false;
        this.deleted = false;
    }
}

class FeedbackManager {
    constructor() {
        this.feedbacks = [
            new Feedback(0, "Deleniti nihil autem totam qui. Ipsam quod animi sunt perspiciatis. Accusantium perferendis vel dolorem dolore nostrum ut aperiam. Dolores facilis adipisci sed sint praesentium aut aperiam natus. Repudiandae unde perferendis saepe et voluptatibus assumenda. Dolor aut expedita dolore.", false, false),
            new Feedback(1, "Molestiae aut nihil minima quis sit mollitia reprehenderit nihil. Dolorem aut eos qui ipsum earum qui voluptatum laudantium. Ex minus unde consequatur esse voluptas aliquid esse. Sed deleniti tempore ratione. Voluptatem excepturi voluptas ipsam rerum dicta aut.", false, false),
            new Feedback(2, "Illo consequatur animi ut cum porro qui ullam doloribus. Praesentium suscipit sint eum. Sint consequuntur neque voluptatum. Ut consequatur non laudantium porro dolorem repellat. Est numquam eos repellendus saepe inventore est aliquid quae. Suscipit qui molestias repellat quo quod.", false, false),
            new Feedback(3, "Praesentium nostrum et molestiae neque error repellat. Atque voluptatem sint unde rerum veritatis nobis illum. Voluptatem quia praesentium minima eius asperiores non non ut.", false, false),
            new Feedback(4, "Voluptas rerum et rerum. Consequatur nobis molestiae sapiente accusamus. Facilis voluptates dicta sed debitis eveniet ut. Laboriosam esse dolorem et aliquid molestias est deleniti nisi. Error fugit culpa nihil at atque provident enim aut.", false, false)
        ];
    }

    get(req, res) {
        const { id } = req.query;
        if (id !== undefined) {
            if (id >= this.feedbacks.length || this.feedbacks[id].deleted) {
                return res.status(400);
            }
            console.log(`GET ${id}`);
            res.json(this.feedbacks[id]);
            return res.status(200);
        } else {
            const non_deleted = this.feedbacks.filter((f) => { return !f.deleted });
            res.json(non_deleted);
            for (let feedback of this.feedbacks) {
                feedback.read = true;
            }
            console.log(`GET`);
            return res.status(200);
        }
    }

    post(req, res) {
        const { text } = req.query;
        console.log(`POST {text}`);
        const id = this.feedbacks.length;
        const feedback = new Feedback(id, text, false, false);
        this.feedbacks.push(feedback);
        return res.status(200);
    }

    put(req, res) {
        const { id, text } = req.query;
        console.log(`PUT ${id} ${text}`)
        if (id === undefined || id >= this.feedbacks.length || this.feedbacks[id].deleted) {
            return res.status(400);
        }
        if (text !== undefined) {
            this.feedbacks[id].text = text;
        }
        return res.status(200);
    }

    del(req, res) {
        const { id } = req.query;
        console.log(`DELETE ${id}`);
        if (id === undefined || id >= this.feedbacks.length || this.feedbacks[id].deleted) {
            return res.status(400);
        }
        this.feedbacks[id].deleted = true;
        return res.status(200);
    }
}

const feedbacks = new FeedbackManager();
const get  = (req, res) => { return  feedbacks.get(req, res); }
const post = (req, res) => { return feedbacks.post(req, res); }
const put  = (req, res) => { return  feedbacks.put(req, res); }
const del  = (req, res) => { return  feedbacks.del(req, res); }

module.exports = { get, post, put, del };

