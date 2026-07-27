import { ArchitectureFlow } from "@/components/diagrams/ArchitectureFlow";
import { MedallionDiagram } from "@/components/diagrams/MedallionDiagram";
import { StarSchemaDiagram } from "@/components/diagrams/StarSchemaDiagram";
import type { Project } from "@/types";

/** Picks the most meaningful visual for each project's architecture. */
export function ProjectDiagram({ project }: { project: Project }) {
  if (project.diagram === "medallion") {
    return (
      <div className="space-y-6">
        <MedallionDiagram />
        <ArchitectureFlow
          stages={project.architecture}
          ariaLabel={`Full pipeline for ${project.title}: ${project.architecture.join(", then ")}`}
          compact
        />
      </div>
    );
  }

  if (project.diagram === "star-schema") {
    return <StarSchemaDiagram />;
  }

  const ariaLabel = `Architecture pipeline for ${project.title}: ${project.architecture.join(", then ")}`;
  return <ArchitectureFlow stages={project.architecture} ariaLabel={ariaLabel} />;
}
