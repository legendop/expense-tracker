export async function Fetch(path, data) {
    try {      
      const endpoint = "http://localhost:8000";
      const response = await fetch(endpoint.concat(path), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",          
        },
        body: JSON.stringify({
          data,
        }),
      });
      const body = await response.text();
      const result = JSON.parse(body);
      return result;
    } catch (e) {
      return {
        success: false,
        message: "Internal Server Error",
      };
    } 
  }

  
  export async function Get(query) {
    const endpoint = "http://localhost:8000";    
    const res = await fetch(endpoint + query);
    const body = await res.text();    
    const response = JSON.parse(body);
    return response;
  }

  export async function Delete(query) {
    const endpoint = "http://localhost:8000";    
    const res = await fetch(endpoint + query);
    const body = await res.text();    
    const response = JSON.parse(body);
    return response;
  }
  