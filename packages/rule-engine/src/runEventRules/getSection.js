/**
 * Gets the section that is affected by rule.
 * @param {string} id - section id.
 * @returns {Object} Section.
 */
export const getSection = (id, sections) => {
    for (const section of sections) {
        if (section.id === id) return section
        if (section.childSections) {
            const affectedSection = section.childSections.find(
                childSection => childSection.id === id
            )
            if (affectedSection) return affectedSection
        }
    }
    return null
}
