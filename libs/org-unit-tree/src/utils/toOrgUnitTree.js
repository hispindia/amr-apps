const sortChildren = ou => {
    ou.children.forEach(c => sortChildren(c))
    ou.children.sort((a, b) =>
        a.displayName > b.displayName
            ? 1
            : b.displayName > a.displayName
            ? -1
            : 0
    )
}

export const toOrgUnitTree = orgUnits => {
    const tree = orgUnits[0]

    orgUnits.forEach((o, index) => {
        if (index !== 0) {
            const ancestors = o.path.split('/').slice(1, -1)
            let ancestor = ancestors.shift()
            let parent = orgUnits.find(o => o.path.endsWith(ancestor))
            while (!parent) {
                ancestor = ancestors.shift()
                parent = orgUnits.find(o => o.path.endsWith(ancestor))
            }
            while (ancestors.length > 0) {
                ancestor = ancestors.shift()
                parent = parent.children.find(o => ancestor === o.id)
            }
            if (parent) {
                const children = parent.children
                children[children.findIndex(s => s.id === o.id)] = o
            }
        }
    })

    sortChildren(tree)

    return tree
}
