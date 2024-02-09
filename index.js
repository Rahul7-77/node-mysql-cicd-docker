import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql2/promise";
import session from "express-session";


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: '-1',
    resave: false,
    saveUninitialized: false,
}));
app.use(express.static("public"));

const mysqlConfig = {
    host: "mysql_server",
    user: "rahul",
    password: "secret",
    database: "test_db"
}

let db = null;

app.get('/', async (req, res) => {
    try {
        if (!db) {
            db = await mysql.createPool(mysqlConfig);
            const createTableSql = `
                CREATE TABLE IF NOT EXISTS blog_posts (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    title VARCHAR(255) NOT NULL,
                    date DATE NOT NULL,
                    time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                    text TEXT NOT NULL
                )
            `;
            await db.query(createTableSql);
        }

        const [rows] = await db.query("SELECT * FROM blog_posts ORDER BY time DESC");
        res.render("index.ejs", { entries: rows });
    } catch (error) {
        console.error('Error:', error);
        res.send('An error occurred while processing your request.');
    }
});


app.get('/login', (req, res) => {
    res.render("loginpage.ejs");
})

app.post('/login', async (req, res) => {
    let name = req.body.username;
    let password = req.body.password;
    if (name === "admin" && password === "admin") {
        res.render("admin-home.ejs");
    }
    else {
        res.render("loginpage.ejs", { error: 'Invalid username or password' });
    }
})

app.post('/create-post', async (req, res) => {
    let title = req.body.title;
    let date = req.body.date;
    let announcement = req.body.content;
    await db.query("INSERT INTO blog_posts (title,date,text) VALUES (?,?,?)", [
        title, date, announcement
    ]);
    res.render("admin-home.ejs");
})

app.listen((3000), () => {
    console.log("server running on port 3000");
})