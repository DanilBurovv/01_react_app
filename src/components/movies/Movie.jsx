

const Movie = ({item}) => {
  return (
    <div className="mb-3 rounded-lg border-slate-200 border-2">
        <h2 className="text-2xl px-3">{ item.title }</h2>
    </div>
  )
}

export default Movie