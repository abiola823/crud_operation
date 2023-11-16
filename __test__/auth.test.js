const axios = require("axios");

const authHeader = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkZXNjbzI4IiwidXNlcklkIjoiNjU1NTRjNjg4ZWU2ZDI5YmUzODUzZDhkIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzAwMDkwNTIzfQ.VXpb27PClynD9JdnU52tN_D_dpXPUAmmBrhLXvpviiU";


test("Test to see how the register and login works", async () => {
    const response =  await axios.post("http://localhost:3000/v1/auth/register", {
        fullName: "Abioly2",
        username: "myNam5",
        password: "myPass1",
        role: "admin"
    });
    expect(response.status).toBe(201);
     expect(response.data).toBe("Created Successfully");
});



test("Test to check for login", async () => {
    const response = await axios.post("http://localhost:3000/v1/auth/login", {
        username: "adesco28",
        password: "ade43212"
    }, {
        headers: {
            Authorization: authHeader
        }
    });
    expect(response.status).toBe(200);
    expect( (response.data.message)).toBe("Sign in Successful");

});


