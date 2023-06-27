import { useEffect, useState } from "react"
import { MultipleSelectCheckmarks } from './MultipleSelectCheckmarks'
import { ColorToggleButton } from './ColorToggleButton'
import { getFlag } from '../../../utils/languageToFlag'


export const Filter = ({ cardsOnSell, filters, setFilters }) => {
    const [collectionNames, setCollectionNames] = useState(["Todas"])
    const [languages, setLanguages] = useState(["Todos"])

    useEffect(() => {
        
        const collectionSet =  Array.from(new Set(cardsOnSell.map(card => card.set_name)))
        collectionSet.unshift("Todas")
        setCollectionNames(collectionSet)

        const languagesSet =  Array.from(new Set(cardsOnSell.map(card => card.lang)))
        languagesSet.unshift("Todos")

        setLanguages(languagesSet)

    }, [cardsOnSell])

    const [dummyReset, setDummyReset] = useState(false)

    const handleResetFilters = () => {
        setFilters({
            collection: ["Todas"],
            language: ["Todos"],
            type: "",
          })
        setDummyReset(!dummyReset)
    }

    return (
        <div>
            <h2>Filtros</h2>
            <div className="cards-list-filter">
                <MultipleSelectCheckmarks name="Colección" filterProp="collection" list={collectionNames} defaultVal="Todas" filters={filters} setFilters={setFilters} dummyReset={dummyReset}/>
                <MultipleSelectCheckmarks name="Idioma" filterProp="language" list={languages} defaultVal="Todos" filters={filters} setFilters={setFilters} dummyReset={dummyReset}/>
                <ColorToggleButton filters={filters} setFilters={setFilters} dummyReset={dummyReset}/>
                {(!(filters.collection.length === 1 &&  filters.collection[0] === "Todas" ) ||
                !(filters.language.length === 1 &&  filters.language[0] === "Todos") ||
                !(filters.type === "")
                ) &&
                <button className="secondary-button" id='cards-list-button' onClick={handleResetFilters}>Deshacer filtros</button>}
            </div>
        </div>
    )
}
