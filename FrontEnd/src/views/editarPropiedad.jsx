import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Importar funciones de Firebase Storage
import axios from 'axios';
import '../css/editarPropiedades.css';

const EditarPropiedad = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [propiedad, setPropiedad] = useState({
        titulo: '',
        precio: '',
        comuna: '',
        habitaciones: '',
        banos: '',
        descripcion: '',
        imagen: '',
    });
    const [file, setFile] = useState(null); // Nuevo estado para manejar el archivo de imagen

    useEffect(() => {
        const fetchPropiedad = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/properties/${id}`);
                setPropiedad(response.data);
            } catch (error) {
                console.error("Error al cargar la propiedad:", error);
            }
        };
        fetchPropiedad();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setFile(files[0]); // Guardamos el archivo en el estado
        } else {
            setPropiedad({
                ...propiedad,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let downloadURL = propiedad.imagen; // Mantener la URL existente si no se cambia la imagen

        if (file) {
            // Configurar Firebase Storage
            const storage = getStorage();
            const storageRef = ref(storage, `imagenes/${file.name}`);

            try {
                // Subir la imagen a Firebase Storage
                await uploadBytes(storageRef, file);
                downloadURL = await getDownloadURL(storageRef);
            } catch (error) {
                console.error("Error al subir la imagen:", error);
                return;
            }
        }

        const updatedData = {
            ...propiedad,
            imagen: downloadURL ? [downloadURL] : propiedad.imagen, // Usar la nueva URL o la existente
        };

        try {
            const response = await axios.put(`http://localhost:3000/api/properties/${id}`, updatedData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            });
            if (response.status === 200) {
                navigate('/mi-perfil');
            }
        } catch (error) {
            console.error("Error al actualizar la propiedad:", error);
        }
    };

    return (
        <div>
            <h2>Editar Propiedad</h2>
            <form onSubmit={handleSubmit}>
                <label>Título</label>
                <input type="text" name="titulo" value={propiedad.titulo} onChange={handleChange} />
                <label>Precio</label>
                <input type="number" name="precio" value={propiedad.precio} onChange={handleChange} />
                <label>Comuna</label>
                <input type="text" name="comuna" value={propiedad.comuna} onChange={handleChange} />
                <label>Habitaciones</label>
                <input type="number" name="habitaciones" value={propiedad.habitaciones} onChange={handleChange} />
                <label>Baños</label>
                <input type="number" name="banos" value={propiedad.banos} onChange={handleChange} />
                <label>Descripción</label>
                <textarea name="descripcion" value={propiedad.descripcion} onChange={handleChange}></textarea>
                <label>Imagen</label>
                <input type="file" name="imagen" onChange={handleChange} />
                <button type="submit">Guardar Cambios</button>
            </form>
        </div>
    );
};

export default EditarPropiedad;
