

function SearchInput({ setQuery, setOnFocus, query }) {
    return (
        <form >
            <input
                tabIndex={0}
                type="text"
                placeholder='Search Fakebook'
                autoComplete='off'
                value={query}
                onChange={(e) => setQuery(e.target.value.trim())}
                onFocus={() => setOnFocus(true)}
            />
        </form>
    )
}

export default SearchInput