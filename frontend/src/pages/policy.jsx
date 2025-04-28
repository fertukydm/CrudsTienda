import './Policy.css';

const Politicas = () => {

  //odigo de Nuestra politica
  return (
    <div className="okrecords-container">
      <div className="text-content">
        <p>Bienvenid@ a OKRECORDS</p>
        <p>
          Ofrecemos una cuidada selección de vinilos, desde clásicos
           atemporales hasta ediciones limitadas difíciles de encontrar, 
           con un servicio personalizado que entiende lo que significa
            tener un disco en las manos. Creamos experiencias que van más 
            allá de la compra: eventos, recomendaciones expertas y una 
            comunidad para los verdaderos amantes de la música.
        </p>
      </div>
      <br/>

      
      <div className="center-image">
        <img
          src="../public/14.png"
          alt=""
          className="logo"
        />
      </div>
      <div className="text-content">
        <p>Términos de propiedad</p>
        <p>
          Usted no puede detentar propiedad intelectual o exclusiva a
          ninguno de nuestros productos, modificarlos o usarlos modificar.
          Todos los productos son propiedad de los proveedores del
          contenido. En caso de que se le otorgue algún (o varios), nuestros
          productos se proporcionan con el único tipo de garantía, expresa
          o implícita.
        </p>
        <p>Política de pedidos pre-order (por pedido)</p>
        <p>
          Los pedidos bajo demanda se completan tan 2-3 semanas a partir de
          la fecha de compra. El comprador recibe un correo de confirmación
          de su orden y tiene 24 horas para poder cancelar su pedido y poder
          recibir un reembolso. Fuera de este periodo establecido, no es
          posible cancelar el pedido bajo ninguna circunstancia.
        </p>
        <p>
          Todos los órdenes serán sujetos a disponibilidad en la fecha que
          el producto es completado, y los consumidores corrigen y posibles
          cambios producto por uno de valor similar con la suma de un precio
          más bajo, después. El contacto al consumidor a partir de la orden
          y su confirmación de 100% del valor de tu compra.
        </p>
        <p>
          Si tienes alguna duda o consulta puedes escribirnos al correo{" "}
          <strong>OKRECORDS@GMAIL.COM</strong>
        </p>
        <p>Términos de garantía</p>
        <p>
          Nuestros productos tienen garantía y posibilidad de reembolso. En
          todos casos la garantía solo cubrirá fallas de fábrica y sólo se
          hará efectiva cuando el producto se haya usado correctamente. La
          garantía no cubre averías o daños ocasionados por uso indebido, los
          términos de la garantía están asociados a fallas de fabricación y
          funcionamiento en condiciones normales de los productos y sólo se
          hará efectiva una vez termine el plazo que ha sido usado
          correctamente. Esto incluye:
        </p>
      </div>
    </div>
  );
}

export default Politicas;
