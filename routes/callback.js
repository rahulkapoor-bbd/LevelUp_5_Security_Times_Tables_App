import { Router } from 'express';
const router = Router();

router.get('/:code', async function (req, res, next) {
    const code = req.params['code'];

    const response = await fetch('http://localhost:80/identity/accessToken', {
        method: 'POST',
        body: `code=${code}`,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });

    const tokens = await response.json();
    console.log(tokens);
    // window.sessionStorage.setItem('accessToken', tokens.accessToken);
    // window.sessionStorage.setItem('refreshToken', tokens.refreshToken);

    res.redirect('/playgame');
});

export default router;
