export function seedDatabase(firebase) {
  const users = [
    {
      userId: "wnXWd5JD3lcDdyX6XUAGBH2P8Ji1",
      username: "sidmohanty_11",
      fullName: "Sidharth Mohanty",
      emailAddress: "sidmohanty11@gmail.com",
      following: ["2"],
      followers: ["2", "3", "4"],
      dateCreated: Date.now(),
    },
    {
      userId: "2",
      username: "_gates_",
      fullName: "Bill Gates",
      emailAddress: "gates@sanzio.com",
      following: [],
      followers: ["wnXWd5JD3lcDdyX6XUAGBH2P8Ji1"],
      dateCreated: Date.now(),
    },
    {
      userId: "3",
      username: "they_call_me_love_doc",
      fullName: "William Shakespeare",
      emailAddress: "salvador@dali.com",
      following: [],
      followers: ["wnXWd5JD3lcDdyX6XUAGBH2P8Ji1"],
      dateCreated: Date.now(),
    },
    {
      userId: "4",
      username: "orwell",
      fullName: "George Orwell",
      emailAddress: "george@orwell.com",
      following: [],
      followers: ["wnXWd5JD3lcDdyX6XUAGBH2P8Ji1"],
      dateCreated: Date.now(),
    },
  ];

  for (let k = 0; k < users.length; k++) {
    firebase.firestore().collection("users").add(users[k]);
  }

  for (let i = 1; i <= 5; ++i) {
    firebase
      .firestore()
      .collection("photos")
      .add({
        photoId: i,
        userId: "2",
        imageSrc: `/images/users/${i}.jpg`,
        caption: "Saint George and the Dragon",
        likes: [],
        comments: [
          {
            displayName: "dali",
            comment: "Love this place, looks like my animal farm!",
          },
          {
            displayName: "orwell",
            comment: "Would you mind if I used this picture?",
          },
        ],
        userLatitude: "40.7128°",
        userLongitude: "74.0060°",
        dateCreated: Date.now(),
      });
  }
}
