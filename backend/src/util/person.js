module.exports = (person) => {
  // TODO: a function thats automatic create HATEOS
  // const generateHateoes = (route, id) => {
    
  //   const PORT = 333
  //   const baseUrl = `http://localhost:${PORT}/${route}/${id}`

  //   return [
  //     {
  //       href: baseUrl,

  //     }
  //   ]
  // }

  const _links = [
    {
      href: `http://localhost:3333/persons/${person.id}`,
      method: 'UPDATE',
      rel: 'update_person'
    },
    {
      href: `http://localhost:3333/persons/${person.id}`,
      method: 'DELETE',
      rel: 'delete_person'
    },
  ]

  return {
    id: person.id,
    name: person.name,
    category: person.category.name,
    personal_information: person.documents,
    phones: person.phones,
    addresses: person.addresses,
    _links
  }
}