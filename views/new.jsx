const React = require('react')
const Default = require('./layouts/default')

function New({bakers}) {
    return (
        <Default>
            <h2>Add a new bread</h2>
            <form action="/breads" method="POST">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    required>
                </input>
                <label htmlFor="image">Image</label>
                <input
                    type="url"
                    name="image"
                    id="image"
                    pattern="https?://.+" title="Include http://">
                </input>
                <label htmlFor="baker">Baker</label>
                <select name="baker" id="baker">
                    {bakers.map((baker) => {
                        return (
                            <option value={baker.id}>{baker.name}</option>
                        )
                    })}
                {/*    <option value="Rachel">Rachel</option>*/}
                {/*    <option value="Monica">Monica</option>*/}
                {/*    <option value="Joey">Joey</option>*/}
                {/*    <option value="Chandler">Chandler</option>*/}
                {/*    <option value="Ross">Ross</option>*/}
                {/*    <option value="Phoebe">Phoebe</option>*/}
                {/*    <option value="Aldo">Aldo</option>*/}
                </select>
                <label htmlFor="hasGluten">Has Gluten?</label>
                <input
                    type="checkbox"
                    name="hasGluten"
                    id="hasGluten"
                    defaultChecked>
                </input>
                <br />
                <input type="submit"></input>
            </form>
            <div className="backButton">
                <a href="/breads"><button>Go back to the index</button></a>
            </div>
        </Default>
    )
}

module.exports  = New