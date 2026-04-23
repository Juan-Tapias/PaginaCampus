// Declaración para archivos de modelos 3D
declare module "*.glb" {
  const value: string;
  export default value;
}

declare module "*.gltf" {
  const value: string;
  export default value;
}

// Declaración para otros formatos que Next.js podría no tener por defecto
declare module "*.hdr" {
  const value: string;
  export default value;
}

declare module "*.exr" {
  const value: string;
  export default value;
}
