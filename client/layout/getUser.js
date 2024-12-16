import axios from 'axios';

async function fetchUserInfo() {
    // if (!token) {
    //   return '';
    // }
    try {
        const token = localStorage.getItem("accessToken");

      const response = await axios.get("http://localhost:4000/v1/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 403) {
        // Token không hợp lệ hoặc đã hết hạn
        // Xử lý logic để lấy token mới
        await refreshToken();
        // Thử lại yêu cầu
        const newResponse = await axios.get("http://localhost:4000/v1/api/users/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        console.log('newResponse', newResponse);
        
        return newResponse.data;
      } else {
        console.error("Không thể lấy thông tin người dùng", error);
        throw error;
      }
    }
  }
  
  async function refreshToken() {
    const response = await axios.post("http://localhost:4000/v1/api/users/refreshToken", {
        refreshToken: localStorage.getItem("refreshToken"),
      });
      console.log('response refreshtoken', response);
    try {
      
      
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
    } catch (error) {
      console.error("Không thể lấy token mới", error);
      throw error;
    }
  }
async function getUser() {
     
    try {       
        const userInfo = await fetchUserInfo();  
        return userInfo.username;
    } catch (error) {
        console.error("Không thể lấy thông tin người dùng", error);
        console.log(error);
        return null;
    }
}

export default getUser;