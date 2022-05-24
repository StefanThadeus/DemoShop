<?php

namespace Logeecom\DemoShop\App\DataAccess\Models;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

/* Product class definition, extends Eloquent's ORM Model */
/**
 * @method static Builder where($column, $operator = null, $value = null, $boolean = 'and')
 * @property int $id
 * @property int $categoryId
 * @property int $viewCount
 * @property boolean $enabled
 * @property boolean $featured
 * @property double $price
 * @property string $title
 * @property string $sku
 * @property string $brand
 * @property string $shortDescription
 * @property string $description
 * @property string $image
 */
class Product extends Model
{
    // tells ORM the corresponding table name in the database for this model
    // if not specifically stated, the snake case plural name of the class will be assumed for this role instead
    protected $table = 'Product';

    // tell ORM not to automatically maintain 'updated_at' and 'created_at' columns in database table
    public $timestamps = false;

    // tell ORM which attributes should be assignable
    protected $fillable = ['token'];

    /**
     * Get the post that owns the comment.
     */
    public function category(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}