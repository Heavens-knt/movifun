function filterGenres(genres, ids) {
    let names = []
    genres?.forEach(genre => {
        ids?.forEach(id => {
            if(genre.id === id) names.push(genre.name)
        })
    })
    return names.slice(0, 3)
}

export { filterGenres }
