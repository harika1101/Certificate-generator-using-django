const submitBtn = document.getElementById("submit");
const username = document.querySelector("#name");
const coursename = document.querySelector("#course");

const generatePDF = async (name,course)=>{
    const {PDFDocument, rgb}=PDFLib;
    const exBytes = await fetch("./Turq_Certificate.pdf").then((res) => {
        return res.arrayBuffer();
    });

    const exFont = await fetch("./Montserrat-Regular.ttf").then(res=>{
        return res.arrayBuffer();
    })
    
    const pdfDoc = await PDFDocument.load(exBytes);
    pdfDoc.registerFontkit(fontkit);
    const myFont = await pdfDoc.embedFont(exFont);

    const pages = pdfDoc.getPages();
    const firstPg = pages[0];
    
    const textSize=30;
    const nameTextWidth = myFont.widthOfTextAtSize(name,textSize);
    const courseTextWidth = myFont.widthOfTextAtSize(course,textSize);

    firstPg.drawText(name, {
        x: firstPg.getWidth()/2-nameTextWidth/2,
        y: 290,
        size: textSize,
        font: myFont,
        color: rgb(.2,0.84,0.67)
    })

    firstPg.drawText(course, {
        x: firstPg.getWidth()/2-courseTextWidth/2,
        y: 190,
        size: textSize,
        font: myFont,
    })
    
    const uri = await pdfDoc.saveAsBase64({dataUri:true})
    saveAs(uri,"Certificate.pdf", {autoBom: true});
};


submitBtn.addEventListener("click", ()=>{
  const val = username.value;
  const crs = coursename.value;
  generatePDF(val,crs);
})

