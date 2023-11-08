const React = require('react')
const Default = require('./layouts/default')

function Edit({bread, bakers}) {
    return (
        <Default>
            <h2>Edit a bread</h2>
            <form action={`/breads/${bread.id}?_method=PUT`} method="POST">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    defaultValue={bread.name}>
                </input>
                <label htmlFor="image">Image</label>
                <input
                    type="url"
                    name="image"
                    id="image"
                    pattern="https?://.+" title="Include http://"
                    defaultValue={bread.image}>
                </input>
                <label htmlFor="baker">Baker</label>
                <select name="baker" id="baker" defaultValue={bread.baker}>
                    {bakers.map((baker) => {
                        return (
                            <option value={baker.id} key={baker.id}>{baker.name}</option>
                        )
                    })
                    }
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
                    defaultChecked={bread.hasGluten}>
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

module.exports = Edit