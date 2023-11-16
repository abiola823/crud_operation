const axios = require("axios");

const authHeader = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkZXNjbzI4IiwidXNlcklkIjoiNjU1NTRjNjg4ZWU2ZDI5YmUzODUzZDhkIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzAwMDkwNTIzfQ.VXpb27PClynD9JdnU52tN_D_dpXPUAmmBrhLXvpviiU";


test("Get an item", async () => {
    const response = await axios.get("http://localhost:3000/v1/items/", {
       headers: {
        Authorization:  authHeader
       } 
    });
    expect(response.status).toBe(200);
    expect(typeof (response.data)).toBe("object")
});
test("test to Add an item", async () => {
    const response = await axios.post("http://localhost:3000/v1/items/add-items", {
                name: "biscuit",
                description: "brown biscuit",
                price: 2000,
                isInStock: true
    }, {
        headers: {
        Authorization: authHeader
        }
    });
    expect(response.status).toBe(200);
    expect(response.data.isRequestSuccesful).toBe(true)
});


test("test to Delete an item with id", async () => {
    const response = await axios.delete("http://localhost:3000/v1/items/delete/65555c5a42f97938c4e711ea", {
        headers: {
        Authorization: authHeader
        }
    });
    expect(response.status).toBe(200);
    expect(response.data).toBe("Item has been deleted sucessfully!")
});