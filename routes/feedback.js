const sqlite3 = require('sqlite3').verbose();
const { LoremIpsum } = require("lorem-ipsum");

class Feedback {
    constructor(id, txt, read) {
        this.id = id;
        this.txt = txt;
        this.read = false;
    }
}

class FeedbackManager {
    constructor() {
        this.db = new sqlite3.Database("./db.sqlite3");
        this.db.run("CREATE TABLE IF NOT EXISTS feedbacks(id INTEGER PRIMARY KEY, txt TEXT NOT NULL, read BOOL NOT NULL) ");
        const lorem = new LoremIpsum();
        for (let i = 1; i <= 6; i++) {
            const txt = lorem.generateParagraphs(1);
            this.db.run("INSERT OR REPLACE INTO feedbacks(id, txt, read) VALUES (?, ?, ?)", i, txt, false);
        }
    }

    get(req, res) {
        const { id } = req.query;
        if (id !== undefined) {
            console.log(`GET ${id}`);
            this.db.get("SELECT * FROM feedbacks WHERE id=(?)", id, (err, row) => {
                if (row === undefined) {
                    return res.status(400);
                } else {
                    res.json(row);
                    return res.status(200);
                }
            });
        } else {
            console.log(`GET`);
            this.db
                .all("SELECT * FROM feedbacks", (err, rows) => {
                res.json(rows);
                return res.status(200);
            })
                .run("UPDATE feedbacks SET read=true");
            return res.status(200);
        }
    }

    post(req, res) {
        const { txt } = req.query;
        console.log(`POST ${txt}`);
        this.db.run("INSERT INTO feedbacks(txt, read) VALUES(?, false)", txt);
        return res.status(200);
    }

    put(req, res) {
        const { id, txt } = req.query;
        console.log(`PUT ${id} ${txt}`)
        if (id === undefined || txt === undefined) {
            return res.status(400);
        }
        this.db.get(
            "UPDATE feedbacks SET txt=(?) WHERE id=(?) RETURNING (1)", txt, id,
            (err, row) => { return res.status(row === undefined ? 400 : 200); }
        );
    }

    del(req, res) {
        const { id } = req.query;
        console.log(`DELETE ${id}`);
        this.db.get("DELETE FROM feedbacks WHERE id=(?) RETURNING (1)", id, (err, row) => {
            if (row === undefined) {
                return res.status(400);
            } else {
                return res.status(200);
            }
        })
    }
}

const feedbacks = new FeedbackManager();
const get  = (req, res) => { return  feedbacks.get(req, res); }
const post = (req, res) => { return feedbacks.post(req, res); }
const put  = (req, res) => { return  feedbacks.put(req, res); }
const del  = (req, res) => { return  feedbacks.del(req, res); }

module.exports = { get, post, put, del };

