import React from "react"
import Layout from "../components/layout"

const About = ({ data }) => {
	console.log(data)
	return (
		<Layout pageTitle="About" pageDescription="Learn more about me">
			<div
				dangerouslySetInnerHTML={{
					__html: data.sanityAbout._rawDescription[0].children[0].text,
				}}
			/>
		</Layout>
	)
}

export default About

export const query = graphql`
	query sanityAbout($id: String!) {
		sanityAbout(id: { eq: $id }) {
			id
			title
			_rawDescription
		}
	}
`
