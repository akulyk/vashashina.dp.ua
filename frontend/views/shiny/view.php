<?php 
use yii\helpers\Html;
use frontend\assets\ViewAsset;
use yii\widgets\Breadcrumbs;
use yii\grid\GridView;
use yii\widgets\ActiveForm;
use yii\bootstrap\Tabs;
use yii\bootstrap\Alert;
$this->title = ($model->pageTitle)?$model->pageTitle:$model->fullTitle;
$this->registerMetaTag(['name'=> 'keywords','content' =>$model->meta_k]);
$this->registerMetaTag(['name'=> 'description','content'=>$model->meta_d]);
$this->registerJs('$(document).on("pjax:timeout", function(event) {
  // Prevent default timeout redirection behavior
  event.preventDefault();
});');

ViewAsset::register($this);
$this->registerJs("$('.fancybox').fancybox({
		prevEffect	: 'none',
		nextEffect	: 'none',
        //        maxWidth	: 800,
	//	maxHeight	: 600,
		fitToView	: false,
	//	width		: '70%',
	//	height		: '70%',
		autoSize	: true,
		closeClick	: false,
		openEffect	: 'none',
		closeEffect	: 'none' , 
		helpers	: {
			title	: {
				type: 'outside'
			},
			thumbs	: {
				width	: 50,
				height	: 50
			}
		}
	});", $this::POS_END, 'fancybox-a');
$this->registerJs(""
        . "$('input[type=number]').on('change',function(e){
            if (e.target.value >= 1){
        var price = $('div.price').html()
        var data = price.split('&nbsp;'); 
        if (data.length == 1){
        data = price.split(' ')        
          }
        if (data.length == 2){
        var simbol = data[1];  
        var priceP = parseFloat(price.replace(/[,]+/g, '.'));
           
        } else if (data.length == 3){
          var simbol = data[2];
          priceOne = data[0]+data[1];
          priceOne = priceOne.replace(/[,]+/g, '.');
           var priceP = parseFloat(priceOne);
        }
       
 
        var sum = priceP * e.target.value;
        sum = sum.toFixed(0);
        var rgx = /(\d+)(\d{3})/;
        sum = sum.replace(rgx, '$1' + '&nbsp;' + '$2')+ '&nbsp;' + simbol;
         
        $('div.total').html(sum.replace(/[.]+/g, ','));
        }
         });");
$this->registerJs(<<<JS
  
   function setImageSize(){
   var maxWidth = $('div.tovar-img').width();     
   var img = $('div.tovar-img > a > img');    
   }
JS
   );
$model->views++;
 $model->save(false);
?>


    <div class="main">
    <div class="container tovar">
            <?php echo Breadcrumbs::widget([
    'itemTemplate' => "<li class=\"path\">{link}</li>\n", // template for all links
    'homeLink'=>['label'=>  Yii::t('app', 'Home'),
        'template'=>"<li class=\"this-page\">Вы находитесь здесь: {link}</li>\n",
        'url'=>  yii\helpers\Url::home()],
        'links' => [
        [
            'label' => 'Шины',
            'url' => ['shiny/find'],
            'template' => "<li><span class=\"this-page\">{link}</span></li>\n", // template for this link only
        ],
        
        [
            'label' => $model->brand->getTitle(),
            'url' => ['shiny/find','Tire[manufacturer_id]'=>$model->brand->id],
            'template' => "<li><span class=\"this-page\">{link}</span></li>\n", // template for this link only
        ],    
         
        [
            'label' => $model->title,
            'url' => $model->url,
            'template' => "<li><span class=\"this-page\">{link}</span></li>\n", // template for this link only
        ],
        //['label' => 'Sample Post',
         //'template' => "<li><span class=\"this-page\">{link}</span></li>\n"],
    ],
]);?>
        <div class="alerts">
<?php if (Yii::$app->session->hasFlash('success')):?>
<?php echo Alert::widget([
    'options' => [
        'class' => 'alert-success alert-dismissible',
    ],
    'body' => Yii::$app->session->getFlash('success'),
]);?>
<?php elseif (Yii::$app->session->hasFlash('error')):?>
<?php echo Alert::widget([
    'options' => [
        'class' => 'alert-danger alert-dismissible',
    ],
    'body' => Yii::$app->session->getFlash('error'),
]);?>
<?php endif;?>
</div>
        <div class="row">
            <div class="col-md-12">
          <h1><?=Html::img($model->seasonImageUrl,['class'=>'season']);?>
              <?=$model->brand->title.' '.$model->title;?></h1>
            </div>
          <div class="col-sm-4">
            <div class="exist code">
              <p class="float-left"><?=($tire->quantity >0)?"Есть в наличии":"Нет в наличии";?></p>
              <p class="float-right text-right">код товара:<?=$tire->id;?></p>
            </div>
            <div class="tovar-img">
                <?php echo Html::a(Html::img($model->imageUrl,['alt'=>$model->brand->title.' '.$model->title,
                    'title'=>$model->brand->title.' '.$model->title,
                    'class'=>'img-responsive']),
                        $model->imageUrl,['class'=>'fancybox img-responsive','data-fancybox-group'=>'gallery',
		'title'=>$model->title]);?>
            </div>
            <?php echo \frontend\widgets\yashare\YaShare::widget([
                'title'=>'Шины '.$model->brand->title.' '.$model->title,
                'url'=>$model->url,
                'image'=>$model->imageUrl,
                'desc'=>$model->long_desc
            ]);?>
          </div>
          <div class="col-sm-5">
            <h3>характеристики</h3>
            <table class="table table-striped">
              <tr>
                <td>Производитель</td>
                <td><?=$model->brand->getTitle();?></td>
              </tr>
              <tr>
                <td>Сезонность</td>
                <td><?=$model->tireSeason->title;?></td>
              </tr>
              <tr>
                <td>Тип авто</td>
                <td><?=$model->carType->title;?></td>
              </tr>
              <tr>
                <td>Ширина</td>
                <td><?=$tire->width;?></td>
              </tr>
              <tr>
                <td>Высота</td>
                <td><?=$tire->profile;?></td>
              </tr>
              <tr>
                <td>Диаметр</td>
                <td>R<?=$tire->diameter;?></td>
              </tr>
              <tr>
                <td>Индекс нагрузки</td>
                <td><?=$tire->max_load;?></td>
              </tr>
              <tr>
                <td>Индекс скорости</td>
                <td><?=$tire->max_speed;?></td>
              </tr>
              <tr>
                <td>Шипованная</td>
                <td><?=($tire->ship=='ship')?'Да':'Нет';?></td>
              </tr>
              <!--
              <tr>
                <td>Регион производства</td>
                <td>Европейский союз</td>
              </tr>
              -->
            </table>
          </div>
          <div class="col-sm-3">
               <?php ActiveForm::begin([
                          
                          'method'=>'GET',
                          'action'=>$tire->toCartUrl,
                          'options' => ['class' => 'form-horizontal'],
                            ]);?>
            <div class="price-block margin-30">
              <div>Цена за одну шину</div>
              <div class="price"><?= \frontend\widgets\price\Price::widget(
                      ['amount'=>$tire->getPrice()]);?></div>
            </div>
            <div class="count-block margin-30">
              <div class="count">Мне нужно <span>
                     
                  <input name="qty" type="number" value="1">шт.</span></div>
                
              <div>Общая сумма</div>
              <div class="price total"><?= \frontend\widgets\price\Price::widget(
                      ['amount'=>$tire->getPrice()]);?></div>
            </div>
            <button class="send-calc block margin-30 buy">КУПИТЬ</button>
             <?php ActiveForm::end();?>
          </div>
        </div>
        
   
<div class="row margin-30 spec">
<?php          echo Tabs::widget([
    'options'=>['class'=>'item-options'],
    'items' => [
        
        [
            'label' => 'Другие шины',
            'content' => $this->render('_tireGridView',['tireProvider'=>$tireProvider]),
            'headerOptions' => [],
            'options' => ['id' => 'otherTires'],
             'active' => ($this->context->tab == 'items') ? TRUE : FALSE
        ],
        
        [
            'label' => 'Описание',
            'content' => $this->render('_description',['desc'=>$model->long_desc]),
            'active' => ($this->context->tab == 'desc') ? TRUE : FALSE
           
        ],
        
        [
            'label' => 'Отзывы<span class="count new">'.$countComments.'</span>',
              'content' => $this->render('/products/_itemComments',
    ['model'=>$commentModel,'comments'=>$comments, 'countComments'=>$countComments]),
            'encode'=>false,
            'active' => ($this->context->tab == 'comment') ? TRUE : FALSE
        ],
        
        [
            'label' => 'Оплата',
            'content' => $this->render('_payment'),
            
        ],
        
         [
            'label' => 'Доставка',
            'content' => $this->render('_delivery'),
            
        ],
        
         [
            'label' => 'Гарантия',
            'content' => $this->render('_warranty'),
            
        ],
      
    ],
]);?>
</div>
        </div>
         </div>


   
   
    
