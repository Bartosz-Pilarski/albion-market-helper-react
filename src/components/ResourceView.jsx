import ResourceNavigation from "./ResourceNavigation"

const ResourceView = ({ resourceType }) => {
  return(
    <div className="main-view resource-view">
      <ResourceNavigation />
      <h1> {resourceType} Refining </h1>
    </div>
  )
}

export default ResourceView