const express = require('express');
const axios = require('axios');
const { query } = require('express');
const { id } = require('express');
const router = express.Router();

var url= 'https://api.github.com';

const GITHUB_USER = 'google';

// Ruta para obtener los 10 repositorios más populares del usuario
router.get('/repos', async (req, res) => {
  try {
        const response = await axios.get(`${url}/users/${GITHUB_USER}/repos`, {
        params: {
            sort: 'stars',
            per_page: 10,
        },
        headers: {
            'Accept': 'application/vnd.github.v3+json'
        }
        });


        const repos = response.data.map( repo => ({
            name: repo.name,
            description: repo.description,
            stars: repo.stargazers_count,
            url: repo.url
        }));

        res.json(repos);
    }
  catch(error){
    console.log(error);
    res.status(500).send("Error obteniendo repositorios");
  }
  }

)

module.exports = router;