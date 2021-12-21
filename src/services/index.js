export const fetchAddGood = (id) => {
    fetch(`${URL}/${id}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      }
    })
  }
  export const fetchDeleteGood = (id) => {
    fetch(`${URL}/${id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json"
      }
    })
  }
  
  export const fetchAddBasketGoods = () => {
    return fetch(`${URL}/basketgoods`).then((res) => {
      return res.json();
    }).then((data) => {
      return data
    })
  }