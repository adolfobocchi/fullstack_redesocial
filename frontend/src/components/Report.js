import { useEffect } from "react";
import { generateReport } from "../store/modules/Post/actions";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const Report = ({ user, postsReport, generateReport }) => {
    const navigate = useNavigate()
    useEffect(() => {
        generateReport()
    }, []);

    useEffect(() => {

    }, [postsReport]);

    const openPrintWindow = async (e) => {
        const printWindow = window.open('', '_blank');
        printWindow?.document.write('<html><head><title>Relatório</title>');
        printWindow?.document.write('<style>.corFundo {background-color: #DDD;}</style>'); // Estilo para o fundo de cor
        printWindow?.document.write('</head><body>');
        printWindow?.document.write('<div style="width: 210mm; height: 297mm; page-break-inside: avoid; page-break-before: always; page-break-after: always;">'); // Tamanho da página A4

        let content = document.getElementById('modal-content').cloneNode(true);
        const tableArea = content.querySelector('#table-area');
        if (tableArea) {
            tableArea.style.width = '210mm'; // ou qualquer outra largura desejada
            tableArea.style.fontSize = '0.8em'
          }
      
          tableArea.classList.add('print');
          printWindow.document.write(content.innerHTML);

        printWindow?.document.write('</div></body></html>');
        printWindow?.document.close();
        printWindow?.print();
    };

    const handleBack = (e) => {
        e.stopPropagation();
        navigate('/')
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: "center", width: '100vw'}}>
        <div style={{width: '100vw'}} id='modal-content'>
            <div id='table-area' style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flexWrap: 'wrap',
                width: '100%', /* Tamanho da página A4 em largura */
                fontSize: '1em',
                padding: '20px'
            }} >
                <div style={{ display: 'flex', width: '100%', height: '40px', fontWeight: 'bold', justifyContent: 'center', fontSize: '16px' }}>
                    Relatório
                </div>
                <div style={{ display: 'flex', width: '100%', height: '40px', borderBottom: '1px solid #000', fontWeight: 'bold', fontSize: '16px' }}>
                    <div style={{ display: 'flex', width: '40px', alignItems: 'center', justifyContent: 'center'}}>Id</div>
                    <div style={{ display: 'flex', flex: 1, alignItems: 'center' }}>Titulo</div>
                    <div style={{ display: 'flex', width: '80px', alignItems: 'center', justifyContent: 'center' }}>Likes</div>
                    <div style={{ display: 'flex', width: '80px', alignItems: 'center', justifyContent: 'center' }}>Unlikes</div>
                    <div style={{ display: 'flex', width: '80px', alignItems: 'center', justifyContent: 'center' }}>Views</div>
                    <div style={{ display: 'flex', width: '100px', alignItems: 'center', justifyContent: 'center' }}>Comentarios</div>
                </div>
                {postsReport && postsReport.map((post, index) => {
                    return (
                        <div key={index} style={{ display: 'flex', width: '100%', height: '40px', borderBottom: '1px solid #000', fontSize: '14px', backgroundColor: (index % 2) === 0 ? '#FFF' : '#E2E2E2' }}>
                            <div style={{ display: 'flex', width: '40px',alignItems: 'center', justifyContent: 'center' }}>{post.id}</div>
                            <div style={{ display: 'flex', flex: 1,alignItems: 'center',  }}>{post.title}</div>
                            <div style={{ display: 'flex', width: '80px',alignItems: 'center', justifyContent: 'center' }}>{post.likes}</div>
                            <div style={{ display: 'flex', width: '80px',alignItems: 'center', justifyContent: 'center' }}>{post.unlikes}</div>
                            <div style={{ display: 'flex', width: '80px',alignItems: 'center', justifyContent: 'center' }}>{post.views}</div>
                            <div style={{ display: 'flex', width: '100px',alignItems: 'center', justifyContent: 'center' }}>{post.total_comments}</div>
                        </div>
                    )
                })}

            </div>
        </div>
        <div style={{display: 'flex'}}>
            
        <button  style={{padding: '4px', margin: '4px'}} onClick={openPrintWindow}>imprimir</button>
        <button  style={{padding: '4px', margin: '4px'}} onClick={handleBack}>voltar</button>

        </div>
        </div>
    )
}

const mapStateToProps = state => ({
    postsReport: state.post.postsReport,
    user: state.user.user,
});

const mapDispatchToProps = dispatch => ({
    generateReport: () => dispatch(generateReport()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Report);