const express = require('express');
const router = express.Router();
const multer = require('multer');

const productController = require('../controllers/productControl');
const checkAuth = require('../ware/checkAuth');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => { // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});


router.post('/', productController.product_get_all)

router.post('/upload', checkAuth, upload.single('productImage'), productController.product_post_one)

router.get('/:productId', checkAuth, productController.product_get_one)

router.patch('/:productId', checkAuth, productController.product_update_one)

router.delete('/:productId', checkAuth, productController.product_delete_one)


module.exports = router;

# Write Python3 code here 
import torch 
from torch import nn 
from torchvision.models import resnet50 

class DETR(nn.Module): 

def _init_(self, num_classes, hidden_dim, nheads, 
num_encoder_layers, num_decoder_layers): 
super()._init_() 
# We take only convolutional layers from ResNet-50 model 
self.backbone = nn.Sequential(*list(resnet50(pretrained=True).children())[:-2]) 
self.conv = nn.Conv2d(2048, hidden_dim, 1) 
self.transformer = nn.Transformer(hidden_dim, heads, 
num_encoder_layers, num_decoder_layers) 
self.linear_class = nn.Linear(hidden_dim, num_classes + 1) 
self.linear_bbox = nn.Linear(hidden_dim, 4) 
self.query_pos = nn.Parameter(torch.rand(100, hidden_dim)) 
self.row_embed = nn.Parameter(torch.rand(50, hidden_dim // 2)) 
self.col_embed = nn.Parameter(torch.rand(50, hidden_dim // 2)) 
def forward(self, inputs): 
x = self.backbone(inputs) 
h = self.conv(x) 
H , W = h.shape[-2:] 
pos = torch.cat([ 
self.col_embed[:W].unsqueeze(0).repeat(H, 1, 1), 
self.row_embed[:H].unsqueeze(1).repeat(1, W, 1), 
], dim=-1).flatten(0, 1).unsqueeze(1) 
h = self.transformer(pos + h.flatten(2).permute(2, 0, 1), 
self.query_pos.unsqueeze(1)) 
return self.linear_class(h), self.linear_bbox(h).sigmoid() 
detr = DETR(num_classes=91, hidden_dim=256, nheads=8, num_encoder_layers=6, num_decoder_layers=6) 
detr.eval() 
inputs = torch.randn(1, 3, 800, 1200) 
logits, bboxes = detr(inputs) 


<strong>Listing 1: </strong>DETR PyTorch inference code. For clarity, it uses learned positional encodings in the encoder instead of fixed, and positional encodings are added to the input
only instead of at each transformer layer. Making these changes requires going beyond 
PyTorch implementation of transformers, which hampers readability. The entire code 
to reproduce the experiments will be made available before the conference. 
