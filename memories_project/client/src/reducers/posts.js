const reducer = (posts=[], action) =>  {
    // if(action.action === 'CREATE'){

    // }

    switch (action.type) {
        case "CREATE":
            return [...posts, action.paylod]

        case "FETCH_ALL":
            return action.payload;
    

        case "UPDATE":
            return posts.map((post) => post._id === action.payload._id? action.payload: post)

        default:
            return posts;
    }
}

export default reducer