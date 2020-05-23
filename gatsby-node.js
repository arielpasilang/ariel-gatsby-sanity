const path = require(`path`)

const makeRequest = (graphql, request) =>
	new Promise((resolve, reject) => {
		// Query for nodes to use in creating pages.
		resolve(
			graphql(request).then(result => {
				if (result.errors) {
					reject(result.errors)
				}
				return result
			})
		)
	})

exports.createPages = ({ graphql, actions }) => {
	const { createPage } = actions

	const getMarkdownBlogs = makeRequest(
		graphql,
		`query {
			  allSanityAbout {
			    edges {
			      node {
			        id
			      }
			    }
			  }
			}
 `
	).then(result => {
		result.data.allSanityAbout.edges.forEach(data => {
			createPage({
				path: "/about",
				component: path.resolve(`./src/templates/about.js`),
				context: {
					id: data.node.id,
				},
			})
		})
	})

	return Promise.all([getMarkdownBlogs])
}
