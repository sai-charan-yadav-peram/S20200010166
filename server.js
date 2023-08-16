const express = require("express");
const axios = require("axios");

const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post("/register", async (req, res) => {
  try {
    const url = "http://20.244.56.144/train/register";
    const requestData = {
      companyName: req.body.companyName,
      ownerName: req.body.ownerName,
      rollNo: req.body.rollNo,
      ownerEmail: req.body.ownerEmail,
      accessCode: req.body.accessCode,
    };

    const response = await axios.post(
      "http://20.244.56.144/train/register",
      requestData
    );

    res.json(response.data);
  } catch (error) {
    res.json({ error: error.message });
  }
});

const Details = {
  companyName: "Train Central",
  clientID: "5fd07970-4e19-42f6-8a1f-2f32fd724faa",
  clientSecret: "oifIWgKQwcHMpZkp",
  ownerName: "SaiCharanYadavPeram",
  ownerEmail: "saicharanyadav.p20@iiits.in",
  rollNo: "S20200010166",
};

let auth = "";

app.post("/auth", async (req, res) => {
  try {
    const url = "http://20.244.56.144/train/auth";
    const requestData = {
      companyName: Details.companyName,
      clientID: Details.clientID,
      ownerName: Details.ownerName,
      ownerEmail: Details.ownerEmail,
      rollNo: Details.rollNo,
      clientSecret: Details.clientSecret,
    };

    const response = await axios.post(url, requestData);
    auth = response.data;
    console.log(auth);

    res.json(response.data);
  } catch (error) {
    res.json({ error: error.message });
  }
});

auth = {
  token_type: "Bearer",
  access_token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTIxOTQyOTksImNvbXBhbnlOYW1lIjoiVHJhaW4gQ2VudHJhbCIsImNsaWVudElEIjoiNWZkMDc5NzAtNGUxOS00MmY2LThhMWYtMmYzMmZkNzI0ZmFhIiwib3duZXJOYW1lIjoiIiwib3duZXJFbWFpbCI6IiIsInJvbGxObyI6IlMyMDIwMDAxMDE2NiJ9.7B7ZPFqxZytMCiG787SA4z9ypFpf44rJQj1YjSbJgEY",
  expires_in: 1692194299,
};

let authToken = auth.access_token;

app.get("/train/trains", async (req, res) => {
  try {
    const url = "http://20.244.56.144/train/trains";

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTIxOTUyMzMsImNvbXBhbnlOYW1lIjoiVHJhaW4gQ2VudHJhbCIsImNsaWVudElEIjoiNWZkMDc5NzAtNGUxOS00MmY2LThhMWYtMmYzMmZkNzI0ZmFhIiwib3duZXJOYW1lIjoiIiwib3duZXJFbWFpbCI6IiIsInJvbGxObyI6IlMyMDIwMDAxMDE2NiJ9.ZLhjw9Jr9rrWH6c2QADzp6tge6E3CE_33f8jUP8S5bk"}`,
      },
    });

    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
