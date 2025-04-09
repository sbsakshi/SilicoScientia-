import React from 'react'

const page = () => {
  return (
    <div className='container mx-auto px-4 py-8'> 
    <Card className=" backdrop-blur-sm border-none shadow-lg">
            <CardHeader className="text-center border-b pb-4">
              <CardTitle className="text-2xl">Sketcher</CardTitle>
              <div className="bg-red-500 h-64 flex items-center justify-center">
                {isDrawing ? (
                  <div className="text-white">
                    <p>Molecule Drawing Area</p>
                    <p className="text-sm">(Drawing functionality would be implemented here)</p>
                  </div>
                ) : (
                  <Button onClick={handleMakeStructure} variant="outline" className="bg-white hover:bg-gray-100">
                    <Pencil className="mr-2 h-4 w-4" /> Draw Molecule
                  </Button>
                )}
              </div>
            </CardHeader>
            </Card></div>
  )
}

export default page