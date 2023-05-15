import axios from "axios";
import React, { useEffect, useState } from "react"; //https://www.w3schools.com/react/default.asp

//komponenta za menu sa recommended postovima koje prikazujemo na singlePost stranici
const Menu = ({cat}) => {
  //categoriju smo poslali na SinglePage preko <Menu /> komponente
  const [posts, setPosts] = useState([]);

  //The useEffect Hook allows you to perform side effects in your components.
  //Some examples of side effects are: fetching data, directly updating the DOM, and timers.
  useEffect(() => {
    const fetchData = async () => {
      try {
        //dohvaćamo postove ovisno o kategoriji
        const res = await axios.get(`http://localhost:8800/api/posts/?cat=${cat}`);

        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  return (
    <div className="menu">
      <h1>Other posts you may like</h1>
      {posts.map((post) => (
        <div className="post" key={post.id}>
          <img src={post?.img} alt="" />
          <h2>{post.title}</h2>
          <button>Read More</button>
        </div>
      ))}
    </div>
  );
};

export default Menu;