<?php

namespace backend\models\search\tires;

use Yii;
use yii\base\Model;
use yii\data\ActiveDataProvider;
use common\models\tires\TireProfile;

/**
 * TireProfileSearch represents the model behind the search form about `backend\models\TireProfile`.
 */
class TireProfileSearch extends TireProfile
{
    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['id', 'status'], 'integer'],
            [['profile'], 'safe'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function scenarios()
    {
        // bypass scenarios() implementation in the parent class
        return Model::scenarios();
    }

    /**
     * Creates data provider instance with search query applied
     *
     * @param array $params
     *
     * @return ActiveDataProvider
     */
    public function search($params)
    {
        $query = TireProfile::find();

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
        ]);

        if (!($this->load($params) && $this->validate())) {
            return $dataProvider;
        }

        $query->andFilterWhere([
            'id' => $this->id,
            'status' => $this->status,
        ]);

        $query->andFilterWhere(['like', 'profile', $this->profile]);

        return $dataProvider;
    }
}